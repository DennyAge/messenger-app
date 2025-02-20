"use client";

//core
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
//types
import { User } from "@prisma/client";
//components
import Input from "@/components/inputs/Input";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
//helpers
import { cn } from "@/lib/utils";

interface SettingsModalProps {
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({
  currentUser,
  isOpen,
  onClose,
}: SettingsModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });
  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public information.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3 ">
                  <Image
                    src={
                      image || currentUser?.image || "/images/user-circle.png"
                    }
                    alt="Avatar"
                    width="48"
                    height="48"
                    className="rounded-full h-9 w-9 md:h-11 md:w-11"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onSuccess={handleUpload}
                    uploadPreset="fcg7itwm"
                  >
                    <div
                      className={cn(
                        `flex justify-center rounded-md px-3 py-2 text-sm font-semibold
                    border hover:shadow-md transition`,
                        isLoading && "opacity-50 cursor-default",
                      )}
                    >
                      Change
                    </div>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-2">
            <Button
              disabled={isLoading}
              onClick={onClose}
              secondary
              type="button"
            >
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
export default SettingsModal;
