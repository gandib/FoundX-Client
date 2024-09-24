"use client";
import { IClaimant, IReceivedClaimRequest } from "@/src/types";
import { format } from "date-fns";
import { Calendar, Eye, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ImageGallery from "./ImageGallery";
import { Avatar } from "@nextui-org/avatar";
import FeedbackModal from "../../modals/FeedbackModal";
import { useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

type TProps = {
  post: IReceivedClaimRequest;
};
const ClaimPostCard = ({ post }: TProps) => {
  const {
    _id,
    description,
    claimRequests,
    dateFound,
    title,
    city,
    location,
    images,
  } = post || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const { onOpen } = useDisclosure();

  const handleAnswers = (data: Record<string, any>) => {
    setAnswers(data);
    setIsModalOpen(true);
  };

  return (
    <div className="mb-2 rounded-md bg-default-100 p-4">
      <div className="border-b border-default-200 pb-2">
        <div className="border-b border-default-200 py-4">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <Link href={`/found-items/${_id}`}>
                <h1 className="cursor-pointer text-2xl">{title}</h1>
              </Link>
              <p className="flex items-center gap-1 text-xs">
                Found on: <Calendar width={14} />
                {format(new Date(dateFound), "dd MMM, yyyy")}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-1">
                <MapPin width={18} />
                {location}, {city}
              </p>
            </div>
          </div>
          <p>{description}</p>
        </div>

        <ImageGallery images={images} />
      </div>

      <div>
        {claimRequests?.map((claimRequest) => {
          const { claimant, answers, description: comment, _id } = claimRequest;
          const { profilePhoto, name } = claimant as IClaimant;

          return (
            <div
              key={_id}
              className="mx-auto my-3 flex w-full items-center gap-2"
            >
              <Avatar isBordered name="Test" radius="sm" src={profilePhoto} />
              <div className="flex w-full items-center justify-between rounded-md bg-default-200 px-4 py-2 dark:bg-[#333335]">
                <div>
                  <p className="text-xs text-default-600">{name}</p>
                  <p>{comment}</p>
                </div>

                <Eye
                  className="cursor-pointer"
                  onClick={() => handleAnswers({ answers: answers, id: _id })}
                />
              </div>
              {isModalOpen && (
                <FeedbackModal
                  id={_id}
                  setIsModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpen}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClaimPostCard;
