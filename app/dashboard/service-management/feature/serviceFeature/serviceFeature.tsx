import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FeaturesList } from "./feature/FeatureList";
import { AddFeatureDialog } from "./feature/FeatureAdd";
import { deleteFeature, getAllFeature } from "@/lib/api-client/feature";
import { IFeature } from "@/type/feature.type";
import { getAllServiceBasicInfo } from "@/lib/api-client/service";
import { DeleteConfirmDialog } from "@/components/ui/confirmationDialog";
import { toast } from "react-toastify";
import { EditFeatureDialog } from "./feature/FeatureEdit";

export default function ServiceFeature() {
  const [addFeatureOpen, setAddFeatureOpen] = useState(false);
  const [featureList, setFeatureList] = useState<IFeature[]>([]);
  const [serviceList, setServiceList] = useState([]);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<{
    edit: number | null;
    delete: number | null;
  }>({
    edit: null,
    delete: null,
  });

  const fetchServiceData = async () => {
    const response = await getAllServiceBasicInfo();
    setServiceList(response);
  };

  const fetchFeatureData = async () => {
    try {
      const response = await getAllFeature();

      setFeatureList(response.data);
    } catch (errr) {
      console.error("Error fetching FAQs:", errr);
    }
  };

  const handleDelete = async () => {
    if (!selectedId.delete) return;

    setIsDeleteLoading(true);
    try {
      const response = await deleteFeature(selectedId.delete!);
      const updatedFeatureList = featureList.filter(
        (feature) => feature.id !== Number(selectedId?.delete)
      );

      setFeatureList(updatedFeatureList);
      setSelectedId({ edit: null, delete: null });
      toast.success(response.data.message || "Feature deleted successfully");
    } catch (error) {
      console.error("Error deleting feature:", error);
      toast.error("Failed to delete feature. Please try again.");
    } finally {
      setIsDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceData();
    fetchFeatureData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Features</h2>
        <Button onClick={() => setAddFeatureOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Feature
        </Button>
      </div>
      <FeaturesList
        features={featureList}
        onActionIdChange={(id, action) =>
          setSelectedId((prev) => ({ ...prev, [action]: id }))
        }
      />
      <>{console.log(featureList, " features in AddFeatureDialog")}</>
      <AddFeatureDialog
        open={addFeatureOpen}
        onOpenChange={setAddFeatureOpen}
        serviceList={serviceList}
        onUpdateFeatureList={(newFeature: IFeature) => {
          setFeatureList((prev) => [...prev, newFeature]);
        }}
      />

      {selectedId.edit && (
        <EditFeatureDialog
          feature={featureList.find((f) => f.id === selectedId.edit)!}
          serviceList={serviceList}
          open={!!selectedId.edit}
          onUpdateFeatureList={(newFeature: IFeature) => {
            const updatedFaqList = featureList.map((faq) =>
              faq.id === newFeature.id ? newFeature : faq
            );
            setFeatureList(updatedFaqList);
          }}
          onOpenChange={(open) =>
            !open &&
            setSelectedId({
              ...selectedId,
              edit: null,
            })
          }
        />
      )}

      <DeleteConfirmDialog
        open={!!selectedId.delete}
        onOpenChange={(open) =>
          !open &&
          setSelectedId({
            ...selectedId,
            delete: null,
          })
        }
        onConfirm={() => selectedId.delete && handleDelete()}
        title="Delete Feature"
        description="Are you sure you want to delete this feature? This action cannot be undone."
        isLoading={isDeleteLoading}
      />
    </>
  );
}
