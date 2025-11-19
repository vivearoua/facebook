import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/user.model";
import Post from "./models/post.model";
import Community from "./models/community.model";
import { connectToDb } from "./config/connect";

const seedData = async () => {
    try {
        console.log("🌱 Starting database seeding...");

        // Connect to database
        await connectToDb();
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for connection

        // Clear existing data
        console.log("🗑️  Clearing existing data...");
        await User.deleteMany({});
        await Post.deleteMany({});
        await Community.deleteMany({});

        // Create users
        console.log("👥 Creating users...");
        const hashedPassword = await bcrypt.hash("password123", 10);

        const users = await User.create([
            {
                fullName: "Alice Johnson",
                email: "alice@example.com",
                password: hashedPassword,
                bio: "Software engineer passionate about web development and AI",
                mainJob: "Senior Software Engineer",
                Skills: ["JavaScript", "TypeScript", "React", "Node.js"],
                avatar: "alice.png",
            },
            {
                fullName: "Bob Smith",
                email: "bob@example.com",
                password: hashedPassword,
                bio: "UI/UX designer creating beautiful and intuitive interfaces",
                mainJob: "Lead UI/UX Designer",
                Skills: ["Figma", "Adobe XD", "Sketch", "CSS"],
                avatar: "bob.png",
            },
            {
                fullName: "Charlie Brown",
                email: "charlie@example.com",
                password: hashedPassword,
                bio: "Full-stack developer and tech enthusiast",
                mainJob: "Full Stack Developer",
                Skills: ["Python", "Django", "React", "PostgreSQL"],
                avatar: "charlie.png",
            },
            {
                fullName: "Diana Prince",
                email: "diana@example.com",
                password: hashedPassword,
                bio: "Product manager with a passion for innovation",
                mainJob: "Product Manager",
                Skills: ["Agile", "Scrum", "Product Strategy", "Analytics"],
                avatar: "diana.png",
            },
            {
                fullName: "Ethan Hunt",
                email: "ethan@example.com",
                password: hashedPassword,
                bio: "DevOps engineer automating everything",
                mainJob: "DevOps Engineer",
                Skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
                avatar: "ethan.png",
            },
        ]);

        console.log(`✅ Created ${users.length} users`);

        // Create followings relationships
        console.log("🔗 Creating follow relationships...");
        await User.findByIdAndUpdate(users[0]._id, {
            followers: [users[1]._id, users[2]._id],
            followings: [users[1]._id, users[3]._id],
        });
        await User.findByIdAndUpdate(users[1]._id, {
            followers: [users[0]._id, users[3]._id],
            followings: [users[0]._id, users[2]._id],
        });
        await User.findByIdAndUpdate(users[2]._id, {
            followers: [users[0]._id, users[1]._id, users[4]._id],
            followings: [users[1]._id],
        });

        // Create posts
        console.log("📝 Creating posts...");
        const posts = await Post.create([
            {
                content: "Just launched my new portfolio website! Check it out and let me know what you think. Built with Next.js and TypeScript 🚀",
                userId: users[0]._id,
                likes: [users[1]._id, users[2]._id, users[3]._id],
            },
            {
                content: "Working on a new design system for our product. Excited to share the progress soon! #UIDesign #DesignSystem",
                userId: users[1]._id,
                likes: [users[0]._id, users[3]._id],
            },
            {
                content: "Anyone else struggling with TypeScript generics? Just spent 2 hours debugging a type error 😅",
                userId: users[2]._id,
                likes: [users[0]._id, users[1]._id],
            },
            {
                content: "Great product launch today! Thanks to the amazing team for making it happen 🎉",
                userId: users[3]._id,
                likes: [users[0]._id, users[1]._id, users[2]._id, users[4]._id],
            },
            {
                content: "Automated our entire deployment pipeline. Now we can deploy to production in under 5 minutes! ⚡",
                userId: users[4]._id,
                likes: [users[0]._id, users[2]._id],
            },
            {
                content: "Learning React hooks has been a game changer for my development workflow. What are your favorite hooks?",
                userId: users[0]._id,
                likes: [users[1]._id, users[2]._id],
            },
            {
                content: "Just finished reading 'Don't Make Me Think' by Steve Krug. Highly recommend for anyone in UX!",
                userId: users[1]._id,
                likes: [users[3]._id],
            },
            {
                content: "Coffee + Code = Perfect Morning ☕💻",
                userId: users[2]._id,
                likes: [users[0]._id, users[1]._id, users[4]._id],
            },
        ]);

        console.log(`✅ Created ${posts.length} posts`);

        // Update users with their posts
        for (const post of posts) {
            await User.findByIdAndUpdate(post.userId, {
                $push: { posts: post._id },
                $inc: { numberOfLikes: post.likes.length },
            });
        }

        // Create communities
        console.log("🏘️  Creating communities...");
        const communities = await Community.create([
            {
                name: "Web Developers",
                CreatorId: users[0]._id,
                admins: [users[0]._id],
                members: [users[0]._id, users[1]._id, users[2]._id],
                bio: "A community for web developers to share knowledge, tips, and resources",
                posts: [],
            },
            {
                name: "UI/UX Designers",
                CreatorId: users[1]._id,
                admins: [users[1]._id],
                members: [users[1]._id, users[3]._id],
                bio: "Share your designs, get feedback, and learn from other designers",
                posts: [],
            },
            {
                name: "DevOps Engineers",
                CreatorId: users[4]._id,
                admins: [users[4]._id],
                members: [users[4]._id, users[0]._id, users[2]._id],
                bio: "Discuss automation, CI/CD, cloud infrastructure, and DevOps best practices",
                posts: [],
            },
            {
                name: "Product Management",
                CreatorId: users[3]._id,
                admins: [users[3]._id],
                members: [users[3]._id, users[1]._id],
                bio: "For product managers to discuss strategy, roadmaps, and product development",
                posts: [],
            },
        ]);

        console.log(`✅ Created ${communities.length} communities`);

        // Update users with their communities
        for (const community of communities) {
            for (const memberId of community.members) {
                await User.findByIdAndUpdate(memberId, {
                    $push: { communities: community._id },
                });
            }
        }

        console.log("\n✨ Database seeding completed successfully!");
        console.log("\n📊 Summary:");
        console.log(`   - ${users.length} users created`);
        console.log(`   - ${posts.length} posts created`);
        console.log(`   - ${communities.length} communities created`);
        console.log("\n🔑 Login credentials for all users:");
        console.log(`   Email: alice@example.com (or any user email)`);
        console.log(`   Password: password123`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};

seedData();
