import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const filePath = join(process.cwd(), "public", "UsersData.json");

            // Read existing data
            const existingData = JSON.parse(await readFile(filePath, "utf-8"));

            // Append new data
            const newData = [...existingData, req.body];

            // Save updated JSON
            await writeFile(filePath, JSON.stringify(newData, null, 2));

            return res.status(200).json({ message: "Data saved successfully!" ,});
        } catch (error) {
            return res.status(500).json({ error: "Failed to save data",error });
        }
    } else {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}
