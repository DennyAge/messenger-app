"use client";

//core
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TbPhotoPlus } from "react-icons/tb";
import axios from "axios";
//hooks
import useConversation from "@/hooks/useConversation";
//components
import MessageInput from "@/app/conversations/[conversationId]/components/MessageInput";
import { PiPaperPlaneTiltLight } from "react-icons/pi";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });

    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };
  return (
    <div className="p-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <TbPhotoPlus size={30} className="text-primary/60" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message..."
        />
        <button
          type="submit"
          className="rounded-full  p-2 bg-primary/30 cursor-pointer hover:bg-primary/60 transition"
        >
          <PiPaperPlaneTiltLight size={19} className="text-white" />
        </button>
      </form>
    </div>
  );
};
export default Form;
