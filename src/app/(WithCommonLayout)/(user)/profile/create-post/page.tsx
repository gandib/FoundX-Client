"use client";

import { AddIcon, TrashIcon } from "@/src/assets/icons";
import FXDatePicker from "@/src/components/form/FXDatePicker";
import FXInput from "@/src/components/form/FXInput";
import FXSelect from "@/src/components/form/FXSelect";
import FXTextarea from "@/src/components/form/FXTextarea";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useGetCategories } from "@/src/hooks/categories.hook";
import { useCreatePost } from "@/src/hooks/post.hook";
import { ICategory } from "@/src/types";
import dateToISO from "@/src/utils/dateToISO";
import { allDistict } from "@bangladeshi/bangladesh-address";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import {
  FieldValues,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { string } from "zod";

const cityOptions = allDistict()
  .sort()
  .map((city: string) => ({
    key: city,
    label: city,
  }));

const page = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const { user } = useUser();
  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess: createPostSuccess,
  } = useCreatePost();
  const router = useRouter();

  const {
    data: categoriesData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useGetCategories();

  let categoryOption: { key: string; label: string }[] = [];
  if (categoriesData?.data && !categoryLoading) {
    categoryOption = categoriesData.data.sort().map((category: ICategory) => ({
      key: category._id,
      label: category.name,
    }));
  }

  const methods = useForm();

  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();

    const postData = {
      ...data,
      questions: data.questions.map((ques: { value: string }) => ques.value),
      dateFound: dateToISO(data.dateFound),
      user: user?._id,
    };

    formData.append("data", JSON.stringify(postData));

    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }
    handleCreatePost(formData);
    console.log(formData.get("data"));
    console.log(formData.get("itemImages"));
  };

  const handleFieldAppend = () => {
    append({ name: "questions" });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  if (!createPostPending && createPostSuccess) {
    router.push("/");
  }

  return (
    <>
      {createPostPending && <Loading />}
      <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-[73px] py-12">
        <h1 className="text-2xl font-semibold">Post a found item</h1>
        <Divider className="mb-5 mt-3" />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXInput label="Title" name="title" />
              </div>
              <div className="min-w-fit flex-1">
                <FXDatePicker label="Found date" name="dateFound" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXInput label="Location" name="location" />
              </div>
              <div className="min-w-fit flex-1">
                <FXSelect label="City" name="city" options={cityOptions} />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXSelect
                  label="Category"
                  name="category"
                  options={categoryOption}
                  disabled={!categorySuccess}
                />
              </div>
              <div className="min-w-fit flex-1">
                <label
                  className="bg-gray-500 block w-full h-full rounded-md"
                  htmlFor="image"
                >
                  Upload image
                </label>
                <input
                  className="hidden"
                  multiple
                  type="file"
                  id="image"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            </div>
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-5 my-5">
                {imagePreviews.map((imageDataUrl) => (
                  <div
                    key={imageDataUrl}
                    className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                  >
                    <img
                      src={imageDataUrl}
                      alt="item"
                      className="h-full w-full object-cover object-center rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap-reverse gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXTextarea label="Description" name="description" />
              </div>
            </div>

            <Divider className="my-5" />
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-xl">Owner verification questions</h1>
              <Button isIconOnly onClick={() => handleFieldAppend()}>
                <AddIcon />
              </Button>
            </div>

            <div className="space-y-5">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <FXInput name={`questions.${index}.value`} label="Question" />
                  <Button
                    isIconOnly
                    onClick={() => remove(index)}
                    className="h-14 w-16"
                  >
                    <TrashIcon />
                  </Button>
                </div>
              ))}
            </div>

            <Divider className="my-5" />

            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Post
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default page;
