import { prisma } from "@/lib/prisma";

export async function logActivity(
  type: string,
  action: string,
  itemName: string
) {
  console.log(`Logging activity: ${type} - ${action} - ${itemName}`);
  try {
    const activity = await prisma.adminActivity.create({
      data: {
        type,
        action,
        itemName,
      },
    });
    console.log("Activity logged successfully:", activity.id);
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}
