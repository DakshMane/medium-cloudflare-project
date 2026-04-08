import zod from 'zod';
export const userSchema = zod.object({
    name: zod.string().min(3).optional(),
    email: zod.email(),
    password: zod.string().min(6),
});
export const blogSchema = zod.object({
    title: zod.string().min(5),
    content: zod.string().min(20),
});
//# sourceMappingURL=index.js.map