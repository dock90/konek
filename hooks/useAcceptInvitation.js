import { useMutation } from '@apollo/client';
import { ACCEPT_INVITATION_MUTATION } from '../queries/InvitationQueries';
import { ROOMS_QUERY } from '../queries/RoomQueries';

export function useAcceptInvitation() {
  return useMutation(ACCEPT_INVITATION_MUTATION, {
    // They likely have access to more groups/etc, so we'll re-load them.
    refetchQueries: [{ query: ROOMS_QUERY }],
  });
}
