import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * Handle POST requests to fetch an existing user by the authenticated user's email or create a new user record if none exists.
 *
 * @returns A NextResponse JSON containing either:
 * - the existing user object when a matching user is found,
 * - the newly created user object when no match exists,
 * - an error object `{ error: "User email not found" }` with status `400` when the authenticated user lacks an email,
 * - or an error object `{ error: "Internal server error" }` with status `500` on failure.
 */
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