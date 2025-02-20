//actions
import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
//components
import Header from "@/app/conversations/[conversationId]/components/Header";
import Body from "@/app/conversations/[conversationId]/components/Body";
import Form from "@/app/conversations/[conversationId]/components/Form";
import EmptyState from "@/components/EmptyState";

interface IParams {
  conversationId: string;
}

const ConversationPage = async ({ params }: { params: Promise<IParams> }) => {
  const { conversationId } = await params;
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};
export default ConversationPage;
