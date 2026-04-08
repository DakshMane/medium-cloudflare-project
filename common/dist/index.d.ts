import zod from 'zod';
export declare const userSchema: zod.ZodObject<{
    name: zod.ZodOptional<zod.ZodString>;
    email: zod.ZodEmail;
    password: zod.ZodString;
}, zod.z.core.$strip>;
export type SignupInput = zod.infer<typeof userSchema>;
export type BlogInput = zod.infer<typeof blogSchema>;
export declare const blogSchema: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
}, zod.z.core.$strip>;
//# sourceMappingURL=index.d.ts.map