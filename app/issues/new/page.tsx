"use client";
import { Button, TextField } from "@radix-ui/themes";
// import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/navigation";

const SimpleMDE = dynamic(
  () =>
    import("../../../node_modules/react-simplemde-editor/dist/SimpleMdeReact"),
  {
    ssr: false,
  }
);

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <TextField.Root
        placeholder="Title"
        {...register("title")} // register function returns 4 props, so need to use spread operator
      ></TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
