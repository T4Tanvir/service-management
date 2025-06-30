import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { getObjectUrl, uploadImageToS3 } from "@/lib/api-client/s3/s3";
import { S3Dto } from "@/dtos/s3.dto";
import { GalleryDto } from "@/dtos/gallery.dto";
import { addImage } from "@/lib/api-client/gallery";

interface AddImageProps {
  onUpdateImageList: (Image: GalleryDto) => void;
}

const AddImage: React.FC<AddImageProps> = ({ onUpdateImageList }) => {
  const [label, setLabel] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const handleAddImage = async () => {
    setLoading(true);
    try {
      if (selectedFile && label.trim()) {
        const dataNeedToPassForUrl = new S3Dto({
          key: `${label}-${Date.now()}-${selectedFile.name}`,
          contentType: selectedFile.type,
        });

        const reponse = await getObjectUrl(dataNeedToPassForUrl);

        const publicUrl = reponse.data.publicUrl;
        const putUrl = reponse.data.putUrl;

        await uploadImageToS3(putUrl, selectedFile);

        const dataNeedToUpload = new GalleryDto({
          key: dataNeedToPassForUrl.key,
          url: publicUrl,
          label: label,
        });

        const response = await addImage(dataNeedToUpload);
        onUpdateImageList(response.data);

        // Reset form
        setLabel("");
        setSelectedFile(null);
        setPreviewUrl(null);

        // Reset file input
        const fileInput = document.getElementById(
          "image-upload"
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      }
    } catch (error) {
      console.error("Error adding image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Add New Image
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="label">Image Label</Label>
          <Input
            id="label"
            placeholder="Enter image label..."
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image-upload">Select Image</Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="cursor-pointer"
            disabled={loading}
          />
        </div>

        {/* Image Preview */}
        {previewUrl && (
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="relative w-full max-w-sm mx-auto">
              <Image
                src={previewUrl || "/placeholder.svg"}
                alt="Preview"
                width={300}
                height={200}
                className="rounded-lg object-cover w-full h-48 border"
              />
              {selectedFile && (
                <Badge variant="secondary" className="absolute top-2 right-2">
                  {formatFileSize(selectedFile.size)}
                </Badge>
              )}
            </div>
          </div>
        )}

        <Button
          onClick={handleAddImage}
          disabled={!selectedFile || !label.trim() || loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddImage;
