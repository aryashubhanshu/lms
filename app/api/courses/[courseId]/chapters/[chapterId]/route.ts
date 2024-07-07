import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import Mux from "@mux/mux-node";
import { Video } from "lucide-react";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string[] } }
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: String(params.chapterId),
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    // Handle Video Upload
    if (values.videoUrl) {
      const exisitngMuxData = await db.muxData.findFirst({
        where: {
          chapterId: String(params.chapterId),
        },
      });

      if (exisitngMuxData) {
        await video.assets.delete(exisitngMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: exisitngMuxData.id,
          },
        });
      }

      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterId: String(params.chapterId),
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("COURSE CHAPTER ID", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
