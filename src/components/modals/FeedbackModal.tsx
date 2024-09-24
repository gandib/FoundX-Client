import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Dispatch, SetStateAction, useState } from "react";
import { useUpdateClaimRequestStatus } from "@/src/hooks/claimRequest.hook";
import { FieldValues } from "react-hook-form";

interface IProps {
  id: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
}
const FeedbackModal = ({ id, setIsModalOpen, isModalOpen }: IProps) => {
  const { onOpenChange, isOpen } = useDisclosure();
  const { mutate: updateClaimRequestStatus } = useUpdateClaimRequestStatus();
  const [feedback, setFeedback] = useState("");

  const modalClose = () => {
    setIsModalOpen(false);
  };

  const handleClaimStatus = (data: string) => {
    const claimRequestStatus = {
      data: {
        status: data,
        feedback: feedback,
      },
      id,
    };
    console.log(claimRequestStatus);
    updateClaimRequestStatus(claimRequestStatus);
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal isOpen={isModalOpen ? true : isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Feedback and Status change
              </ModalHeader>
              <ModalBody>
                <div>
                  <textarea
                    className="w-full h-12 p-2 rounded-md "
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Feedback"
                  />
                </div>
                <div className="mb-4 mt-2  flex gap-2">
                  <Button
                    onClick={() => handleClaimStatus("APPROVED")}
                    className="w-full"
                  >
                    APPROVE
                  </Button>

                  <Button
                    onClick={() => handleClaimStatus("REJECTED")}
                    className="w-full"
                  >
                    REJECT
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={modalClose}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeedbackModal;
