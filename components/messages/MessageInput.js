import styled from 'styled-components';
import { useContext, useReducer } from 'react';
import { RoomIdContext } from '../../contexts/RoomIdContext';
// components
import { CircularProgress } from '@material-ui/core';
import { Send, Image, Delete, Mic, Adjust } from '@material-ui/icons';
import { sendMessage } from '../../service/Messages';
import { BaseIconButton } from '../styles/IconButton';
import { StyledTextField } from '../material/StyledTextField';
import FileUpload from '../assets/FileUpload';
import { FlexContainer } from '../styles/LayoutStyles';
import AssetDisplay from '../assets/AssetDisplay';
import { isSupported, Recorder } from '../../service/Recorder';
import { MeContext } from '../../contexts/MeContext';
import { RESOURCE_TYPE_AUDIO, uploadFile } from '../../config/cloudinary';

const Container = styled(FlexContainer)`
  flex-direction: column;
`;
const InputArea = styled(FlexContainer)`
  align-items: center;
  justify-content: center;
`;

const SEND_MESSAGE = 'send',
  SEND_COMPLETE = 'send_done',
  MESSAGE_INPUT = 'input';

const ATTACH_OPEN = 'open',
  ATTACH_CLOSE = 'close';

const ASSET_ADD = 'asset_add',
  ASSET_REMOVE = 'asset_remove';

const RECORD_START = 'r_start',
  RECORD_CANCEL = 'cancel',
  RECORD_STOP = 'r_stop';

const recordingSupported = isSupported();

function reducer(state, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        input: '',
        asset: null,
        sending: true,
        allowRecord: recordingSupported,
      };
    case SEND_COMPLETE:
      return { ...state, sending: false };

    case MESSAGE_INPUT:
      return { ...state, input: action.value, allowRecord: false };

    case ATTACH_OPEN:
      return { ...state, open: true };
    case ATTACH_CLOSE:
      return { ...state, open: false };

    case ASSET_ADD:
      return { ...state, asset: action.value, allowRecord: false };
    case ASSET_REMOVE:
      return { ...state, asset: null, allowRecord: recordingSupported };

    case RECORD_START:
      const recorder = new Recorder();
      recorder.start();
      return { ...state, recording: true, recorder };
    case RECORD_STOP:
      return {
        ...state,
        recording: false,
        recorder: null,
      };
    case RECORD_CANCEL:
      return {
        ...state,
        sending: false,
        recording: false,
        recorder: null,
        allowRecord: recordingSupported,
      };
  }
  console.error(`Unknown action type ${action.type}`);
  return state;
}

const MessageInput = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    input: '',
    asset: null,
    sending: false,
    open: false,
    allowRecord: recordingSupported,
    recording: false,
    recorder: null,
  });
  const { roomId } = useContext(RoomIdContext),
    { cloudinaryInfo } = useContext(MeContext);

  async function processMessage() {
    if (state.sending) {
      return;
    }
    if (state.input.length === 0 && !state.asset) {
      // dispatch({type: RECORD_START});
      return;
    }
    const inputVal = state.input,
      assetVal = state.asset;
    dispatch({ type: SEND_MESSAGE });
    await sendMessage(roomId, inputVal, assetVal);
    dispatch({ type: SEND_COMPLETE });
    if (props.updated instanceof Function) {
      props.updated();
    }
  }

  async function handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      await processMessage();
    }
  }
  function handleChange({ target }) {
    dispatch({ type: MESSAGE_INPUT, value: target.value });
  }
  function handleOpenAttach() {
    dispatch({ type: ATTACH_OPEN });
  }
  function handleAttachClose() {
    dispatch({ type: ATTACH_CLOSE });
  }
  function attachSuccess(info) {
    dispatch({
      type: ASSET_ADD,
      value: {
        format: info.format,
        publicId: info.public_id,
        resourceType: info.resource_type,
        type: info.type,
        originalFilename: info.original_filename,
        isAudio: info.is_audio,
      },
    });
  }
  function removeAsset() {
    // TODO: This should delete the asset from Cloudinary also...
    dispatch({ type: ASSET_REMOVE });
  }
  function actionMouseDown(e) {
    if (!state.allowRecord) {
      return;
    }
    dispatch({ type: RECORD_START });
  }
  function actionMouseUp(e) {
    if (!state.recorder) {
      return;
    }
    if (state.recorder) {
      state.recorder.stop();
      if (state.recorder.length() <= 500) {
        // We only had a short click, we won't send the audio.
        state.recorder.destroy();
        dispatch({ type: RECORD_CANCEL });
        return;
      }
      dispatch({ type: SEND_MESSAGE });
      state.recorder.getFile().then(async (file) => {
        state.recorder.destroy();

        const upload = await uploadFile(
          {
            apiKey: cloudinaryInfo.apiKey,
            folder: roomId,
            cloudName: cloudinaryInfo.cloudName,
            resourceType: RESOURCE_TYPE_AUDIO,
            tags: ['recording', roomId],
          },
          file,
        );

        await sendMessage(roomId, '', upload);
        dispatch({ type: SEND_COMPLETE });
      });
    }
    dispatch({ type: RECORD_STOP });
  }

  let icon = <Send />;
  if (state.sending) {
    icon = <CircularProgress size="small" />;
  } else if (state.allowRecord) {
    if (state.recording) {
      icon = <Adjust />;
    } else {
      icon = <Mic />;
    }
  }

  const inputDisabled = state.recording;

  return (
    <Container>
      {state.asset && (
        <InputArea>
          <AssetDisplay asset={state.asset} size={100} />
          <BaseIconButton onClick={removeAsset}>
            <Delete />
          </BaseIconButton>
        </InputArea>
      )}
      <InputArea>
        <BaseIconButton onClick={handleOpenAttach}>
          <Image />
        </BaseIconButton>
        <FileUpload
          folder={roomId}
          open={state.open}
          onClose={handleAttachClose}
          onSuccess={attachSuccess}
          maxFiles={1}
          tags={['message']}
        />
        <StyledTextField
          placeholder="Message..."
          value={state.input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          multiline
          rowsMax={5}
          onFocus={props.focus}
          onBlur={props.blur}
          size="small"
          disabled={inputDisabled}
        />
        <BaseIconButton
          onClick={processMessage}
          onMouseDown={actionMouseDown}
          onMouseUp={actionMouseUp}
        >
          {icon}
        </BaseIconButton>
      </InputArea>
    </Container>
  );
};

export default MessageInput;
