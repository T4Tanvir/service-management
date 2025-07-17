import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/ui/confirmationDialog";
import { ServiceDto } from "@/dtos/service.dto";
import {
  deleteService,
  getAllServiceDetails,
  getServicesNestedInfo,
} from "@/lib/api-client/service";
import { NestedService } from "@/type/service.type";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AddServiceDialog } from "./feature/ServiceAdd";
import { EditServiceDialog } from "./feature/serviceEdit";
import { ServicesList } from "./feature/ServiceList";

export default function Service() {
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [services, setServices] = useState<ServiceDto[]>([]);
  const [nestedServices, setNestedServices] = useState<NestedService[]>([]);

  const [actionId, setActionId] = useState<{
    edit: number | null;
    delete: number | null;
  }>({
    edit: null,
    delete: null,
  });

  const [isLoading, setIsLoading] = useState({
    edit: false,
    add: false,
    delete: false,
  });

  const handleDelete = async (id: number) => {
    try {
      setIsLoading((prev) => ({ ...prev, delete: true }));

      const response = await deleteService(id);

      const existingServices = services.filter((service) => service.id !== id);

      setServices(existingServices);
      toast.success(response?.message ?? "Service deleted successfully");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error deleting service:", error);
      toast.error(error?.response?.error || "Failed to delete service");
    } finally {
      setIsLoading((prev) => ({ ...prev, delete: false }));
      setActionId((prev) => ({ ...prev, delete: null }));
    }
  };

  useEffect(() => {
    const loadServices = async () => {
      try {
        const nestedInfo = await getServicesNestedInfo();
        const fetchedServices = await getAllServiceDetails();

        setNestedServices(nestedInfo);
        setServices(fetchedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    loadServices();
  }, []);
  return (
    <>
      <div className="flex justify-between items-center mb-6 mt-2">
        <h2 className="text-2xl font-semibold">Services</h2>
        <Button onClick={() => setAddServiceOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Service
        </Button>
      </div>

      <ServicesList
        services={services}
        onActionIdChange={(id, action) =>
          setActionId((prev) => ({ ...prev, [action]: id }))
        }
      />

      <AddServiceDialog
        open={addServiceOpen}
        onOpenChange={setAddServiceOpen}
        nestedServices={nestedServices}
        onAddService={(service) => {
          setServices((prev) => [...prev, service]);
        }}
      />

      <DeleteConfirmDialog
        isLoading={isLoading.delete}
        open={!!actionId.delete}
        onOpenChange={(open) =>
          !open && setActionId((prev) => ({ ...prev, delete: null }))
        }
        onConfirm={() => actionId.delete && handleDelete(actionId.delete)}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
      />

      {actionId.edit && (
        <EditServiceDialog
          service={services.find((service) => service.id === actionId.edit)!}
          nestedServices={nestedServices}
          open={!!actionId.edit}
          onOpenChange={() => {
            setActionId((prev) => ({ ...prev, edit: null }));
          }}
          onEditService={(service) => {
            const updatedServices = services.map((s) =>
              s.id === service.id ? service : s
            );
            setServices(updatedServices);
          }}
        />
      )}
    </>
  );
}
