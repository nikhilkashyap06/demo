"use client";

import { useState } from "react";

export default function ImageUpload({ 
  onUpload, 
  currentImageUrl 
}: { 
  onUpload: (url: string) => void; 
  currentImageUrl?: string; 
}) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || "");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        onUpload(data.url);
      } else {
        alert("Upload failed: " + data.message);
        setPreviewUrl(currentImageUrl || "");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
      setPreviewUrl(currentImageUrl || "");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {previewUrl && (
        <div className="mt-2">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="h-32 w-32 rounded-lg object-cover border border-gray-300" 
          />
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                <span>{uploading ? "Uploading..." : "Select a file"}</span>
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </label>
              {!uploading && <p className="pl-1">or drag and drop</p>}
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}