import styled from "styled-components";
import { useContext, useState } from "react";
import { RoomIdContext } from "../../contexts/RoomIdContext";
// components
import { CircularProgress } from "@material-ui/core";
import { Send, Image, Delete } from "@material-ui/icons";
import { sendMessage } from "../../service/Messages";
import { BaseIconButton } from "../styles/IconButton";
import { StyledTextField } from "../material/StyledTextField";
import FileUpload from "../assets/FileUpload";
import { FlexContainer } from "../styles/LayoutStyles";
import AssetDisplay from "../assets/AssetDisplay";

const Container = styled(FlexContainer)`
  flex-direction: column;
`;
const InputArea = styled(FlexContainer)`
  align-items: center;
  justify-content: center;
`;

const MessageInput = props => {
  const [input, setInput] = useState(""),
    [asset, setAsset] = useState(null),
    [openAttach, setOpenAttach] = useState(false),
    [sending, setSending] = useState(false);
  const { roomId } = useContext(RoomIdContext);

  const processMessage = async () => {
    if ((input.length === 0 && !asset) || sending) {
      return;
    }
    const inputVal = input,
      assetVal = asset;
    setInput("");
    setAsset(null);
    setSending(true);
    await sendMessage(roomId, inputVal, assetVal);
    setSending(false);
    if (props.updated instanceof Function) {
      props.updated();
    }
  };

  const handleKeyPress = async e => {
    if (e.key === "Enter") {
      e.preventDefault();
      await processMessage();
    }
  };
  function handleChange(e) {
    setInput(e.target.value);
  }
  function handleOpenAttach() {
    setOpenAttach(true);
  }
  function handleAttachClose() {
    setOpenAttach(false);
  }
  function attachSuccess(info) {
    setAsset({
      format: info.format,
      publicId: info.public_id,
      resourceType: info.resource_type,
      type: info.type,
      originalFilename: info.original_filename
    });
  }
  function removeAsset() {
    // TODO: This should delete the asset from Cloudinary also...
    setAsset(null);
  }

  return (
    <Container>
      {asset && (
        <InputArea>
          <AssetDisplay asset={asset} size={100} />
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
          open={openAttach}
          onClose={handleAttachClose}
          onSuccess={attachSuccess}
          maxFiles={1}
          tags={["message"]}
        />
        <StyledTextField
          placeholder="Message..."
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          multiline
          rowsMax={5}
          onFocus={props.focus}
          onBlur={props.blur}
          size="small"
        />
        <BaseIconButton onClick={processMessage}>
          {sending ? <CircularProgress size="small" /> : <Send />}
        </BaseIconButton>
      </InputArea>
    </Container>
  );
};

export default MessageInput;
