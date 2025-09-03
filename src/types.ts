export interface User {
    id: string;
    email: string;
    username: string;
    is_superuser: boolean;
    is_premium_subscribed: boolean;
}

export interface Project {
    id: string;
    name: string;
    source_url: string;
    status: string;
    status_message: string;
    brand_palette?: {
        primary: string;
        secondary: string;
        background: string;
        text_dark: string;
        text_light: string;
    };
    created_at: string;
}

export interface BlogPost {
    id: number;
    title: string;
    content: string;
    main_image_url: string | null;
    author: Partial<User> | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export interface Testimonial {
    id: string;
    content: string;
    user: {
        username: string;
    };
}