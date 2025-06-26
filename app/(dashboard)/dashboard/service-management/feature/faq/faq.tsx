import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/ui/confirmationDialog";
import { deleteFaq, getAllFaq } from "@/lib/api-client/faq";
import {
  getAllServiceBasicInfo,
  getServicesNestedInfo,
} from "@/lib/api-client/service";
import { IFaq } from "@/type/faq.type";
import { NestedService } from "@/type/service.type";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AddFaqDialog } from "./feature/faqAdd";
import { EditFaqDialog } from "./feature/faqEdit";
import { FaqsList } from "./feature/faqList";

export default function Faq() {
  const [addFaqOpen, setAddFaqOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [nestedServices, setNestedServices] = useState<NestedService[]>([]);
  const [faqList, setFaqList] = useState<IFaq[]>([]);
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

    console.log("Fetched Services:", response);

    const nestedInfo = await getServicesNestedInfo();
    setNestedServices(nestedInfo);
  };

  const fetchFaqData = async () => {
    try {
      const response = await getAllFaq();
      console.log("Response from getAllFaq:", response);
      setFaqList(response.data);
      console.log("Fetched FAQs:", response);
      // Handle the response as needed
    } catch (errr) {
      console.error("Error fetching FAQs:", errr);
    }
  };

  const handleDelete = async () => {
    if (!selectedId.delete) return;
    setIsDeleteLoading(true);
    const response = await deleteFaq(selectedId.delete);
    const updatedFaqList = faqList.filter(
      (faq) => faq.id !== selectedId.delete
    );

    toast.success(response.message || "FAQ deleted successfully");
    setFaqList(updatedFaqList);
    setSelectedId({ edit: null, delete: null });
    setIsDeleteLoading(false);

    console.log("FAQ deleted successfully");
  };

  useEffect(() => {
    fetchFaqData();
    fetchServiceData();
  }, []);
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <Button onClick={() => setAddFaqOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New FAQ
        </Button>
      </div>

      <FaqsList
        faqs={faqList}
        onActionIdChange={(id, action) =>
          setSelectedId((prev) => ({ ...prev, [action]: id }))
        }
      />

      <AddFaqDialog
        open={addFaqOpen}
        onOpenChange={setAddFaqOpen}
        nestedServices={nestedServices}
        onUpdateFaqList={(newFaq: IFaq) => {
          setFaqList((prev) => [...prev, newFaq]);
        }}
      />

      {selectedId.edit && (
        <EditFaqDialog
          faq={faqList.find((faq) => faq.id === selectedId.edit)!}
          serviceList={serviceList}
          nestedServices={nestedServices}
          open={!!selectedId.edit}
          onUpdateFaqList={(newFaq: IFaq) => {
            const updatedFaqList = faqList.map((faq) =>
              faq.id === newFaq.id ? newFaq : faq
            );
            setFaqList(updatedFaqList);
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
            edit: null,
          })
        }
        onConfirm={() => selectedId.delete && handleDelete()}
        title="Delete FAQ"
        description="Are you sure you want to delete this FAQ? This action cannot be undone."
        isLoading={isDeleteLoading}
      />
    </>
  );
}
