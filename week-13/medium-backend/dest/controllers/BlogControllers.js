"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const { blogSchema, updateBlogSchema, blogsFilterSchema, } = require("./../Schemas/blogschema");
const findExisting = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma.blogs.findUnique({ where: { id } });
    return existing;
});
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = blogSchema.safeParse(req.body);
    if (!response.success) {
        return res.status(400).json({
            message: response.error.errors.map((err) => err.message).join(", "),
        });
    }
    try {
        const { title, subtitle, content, tags } = response.data;
        console.log(response.data);
        const BlogData = {
            title,
            subtitle,
            content,
            authorId: Number(req.user.id),
        };
        if (tags) {
            const tagsArray = tags.split(",");
            const tagConnections = yield Promise.all(tagsArray.map((tag) => __awaiter(void 0, void 0, void 0, function* () {
                let existingTag = yield prisma.tags.findUnique({ where: { tag } });
                if (!existingTag) {
                    existingTag = yield prisma.tags.create({
                        data: { tag },
                    });
                }
                return { id: existingTag.id };
            })));
            BlogData.tags = { connect: tagConnections };
        }
        const blog = yield prisma.blogs.create({
            data: BlogData,
        });
        return res.status(201).json({ blog, message: "successfully created" });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ error: error.message || "something went wrong" });
        }
        else {
            return res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
});
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("blogs fetched");
    try {
        const filter = blogsFilterSchema.safeParse(req.query);
        if (!filter.success) {
            return res.status(400).json({
                message: filter.error.errors.map((err) => err.message).join(", "),
            });
        }
        let { q, tag, authorId, page, limit } = filter.data;
        if (!limit)
            limit = "10";
        if (!page)
            page = "1";
        const blogs = yield prisma.blogs.findMany({
            where: {
                AND: [
                    {
                        title: q ? { contains: q, mode: "insensitive" } : undefined,
                    },
                    {
                        authorId: authorId ? Number(authorId) : undefined,
                    },
                    {
                        content: q ? { contains: q, mode: "insensitive" } : undefined,
                    },
                    {
                        tags: tag
                            ? {
                                some: {
                                    tag: tag,
                                },
                            }
                            : undefined,
                    },
                ],
            },
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit),
            select: {
                id: true,
                title: true,
                subtitle: true,
                author: { select: { fullname: true } },
                authorId: true,
                likes_count: true,
                saved_count: true,
                tags: { select: { id: true, tag: true } },
                createdAt: true,
            },
        });
        const data = blogs.map((blog) => ({
            id: blog.id,
            title: blog.title,
            subtitle: blog.subtitle,
            author: blog.author.fullname,
            authorId: blog.authorId,
            tags: blog.tags.map((t) => ({ id: t.id, tag: t.tag })),
            likes_count: blog.likes_count,
            saved_count: blog.saved_count,
            createdAt: blog.createdAt.toISOString(), // Ensure it's in string format
        }));
        return res.status(200).json(data);
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ error: error.message || "something went wrong" });
        }
        else {
            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
const getblog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = Number(req.params.blogId);
        const blog = yield findExisting(blogId);
        if (!blog) {
            return res.status(404).json({ message: "blog not found" });
        }
        return res.status(200).json(blog);
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ error: error.message || "something went wrong" });
        }
        else {
            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = Number(req.params.blogId);
        const response = updateBlogSchema.safeParse(req.body);
        if (!response.success) {
            return res.status(400).json({
                message: response.error.errors
                    .map((err) => err.message)
                    .join(", "),
            });
        }
        const existingBlog = yield findExisting(blogId);
        if (!existingBlog) {
            return res.status(404).json({ message: "blog not found" });
        }
        const BlogData = response.data;
        const { title, content, tags } = BlogData;
        if (tags && tags.length > 0) {
            const tagConnections = yield Promise.all(tags.map((tag) => __awaiter(void 0, void 0, void 0, function* () {
                let existingTag = yield prisma.tags.findUnique({ where: { tag } });
                if (!existingTag) {
                    existingTag = yield prisma.tags.create({
                        data: { tag },
                    });
                }
                return { id: existingTag.id };
            })));
            BlogData.tags = { connect: tagConnections };
        }
        yield prisma.blogs.update({
            where: {
                id: blogId,
            },
            data: {
                title: title,
                content: content,
                tags: BlogData.tags,
            },
        });
        return res.status(200).json({ message: "updated successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ error: error.message || "something went wrong" });
        }
        else {
            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.q;
        let tags = [];
        if (query && typeof query === "string") {
            tags = yield prisma.tags.findMany({
                where: {
                    tag: { contains: query },
                },
            });
        }
        return res.status(200).json({ tags });
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ error: error.message || "something went wrong" });
        }
        else {
            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
const deleteblog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = Number(req.params.blogId);
    try {
        const existingBlog = yield findExisting(blogId);
        if (!existingBlog) {
            return res.status(404).json({ message: "blog not found" });
        }
        yield prisma.blogs.delete({
            where: {
                id: blogId,
            },
        });
        return res.status(200).json({ message: "deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ error: error.message || "something went wrong" });
        }
        else {
            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
module.exports = {
    createBlog,
    getblog,
    updateBlog,
    deleteblog,
    getAllBlogs,
    getTags,
};
