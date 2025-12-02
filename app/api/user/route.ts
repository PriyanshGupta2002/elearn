import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const user = await currentUser();

    // Check if user exists
    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress));

    // If user already exists, return existing user
    if (users.length > 0) {
      return NextResponse.json(users[0]);
    }

    // Create new user record
    const newUser = {
      name: user.fullName ?? "",
      email: user?.primaryEmailAddress?.emailAddress ?? "",
      points: 0,
    };

    const res = await db.insert(usersTable).values(newUser).returning();

    return NextResponse.json(res[0] ?? res);
  } catch (error) {
    console.error("Error in POST /api/user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
