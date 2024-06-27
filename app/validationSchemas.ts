import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1, "Title is required.").max(255),
    status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),
    description: z.string().min(1, "Description is")
});