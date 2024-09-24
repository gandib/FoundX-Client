"use client";
import { Input } from "@nextui-org/input";
import { SearchIcon } from "../../icons";
import FXForm from "../../form/FXForm";
import { FieldValues, useForm } from "react-hook-form";
import useDebounce from "@/src/hooks/debounce.hook";
import { useSearchItems } from "@/src/hooks/search.hook";
import { useEffect, useState } from "react";
import { ISearchResult } from "@/src/types";
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/link";

export default function Landing() {
  const { register, handleSubmit, watch } = useForm();
  const { mutate: handleSearch, data, isPending, isSuccess } = useSearchItems();
  const [searchResults, setSearchResults] = useState<ISearchResult[] | []>([]);
  const router = useRouter();

  console.log(data);

  const searchTerm = useDebounce(watch("search"));

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [searchTerm]);

  const onSubmit = (data: FieldValues) => {
    handleSeeAll(data.search);
  };

  const handleSeeAll = (query: string) => {
    const queryString = query.trim().split(" ").join("+");

    router.push(`/found-items?query=${queryString}`);
  };

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
    }

    if (!isPending && isSuccess && data && searchTerm) {
      setSearchResults(data?.data?.hits ?? []);
    }
  }, [isPending, isSuccess, data, searchTerm]);

  return (
    <div className="h-[calc(100vh-64px)] bg-[url('/glass.jpg')] bg-cover bg-center">
      <div className="pt-32 max-w-xl flex-1 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-1">
            <Input
              {...register("search")}
              aria-label="Search"
              classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
              }}
              placeholder="Search..."
              size="lg"
              startContent={
                <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
              }
              type="text"
            />
          </div>
        </form>

        {searchResults.length > 0 && (
          <div className="mt-2 rounded-xl bg-default-100 p-3">
            <div className="space-y-3">
              {searchResults.map((item, index) => (
                <Link
                  key={index}
                  className="text-default-900 block rounded-md from-default-200 p-2 transition-all hover:bg-gradient-to-l"
                  href={`/found-items/${item.id}`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <img
                        className="h-20 w-20 rounded-md"
                        src={item.thumbnail}
                        alt="item"
                      />
                      <div>
                        <p className="text-lg font-semibold">{item.title}</p>
                        <p className="mt-1 line-clamp-2 h-12 w-full text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-3 flex justify-center borde-t-1 border-default-50 pt-3">
              <button
                onClick={() => handleSeeAll(searchTerm)}
                className="flex items-center justify-center gap-1"
              >
                <span>See All</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
