import { Conversation } from "@prisma/client";

interface ConversationCardProps {
  conversation: Conversation;
  selected: boolean;
}

const ConversationCard = ({
  conversation,
  selected,
}: ConversationCardProps) => {
  return <div>ConversationCard</div>;
};
export default ConversationCard;
