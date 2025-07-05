import { ChevronDown } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";

// Type definitions
interface NestedService {
  id: number;
  name: string;
  subcategory: NestedService[];
}

interface SelectedService {
  id: number;
  name: string;
  level: number;
}

interface FormData {
  selectedServices: SelectedService[];
  finalSelection: NestedService | null;
}

// Component prop interfaces
interface SelectProps {
  children: ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

interface SelectItemProps {
  value: string;
  children: ReactNode;
  onSelect?: (value: string) => void;
}

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

// Shadcn Select components simulation
const Select: React.FC<SelectProps> = ({
  children,
  value,
  onValueChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          disabled ? "bg-gray-50" : "hover:bg-gray-50"
        }`}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value || "Select an option..."}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {React.Children.map(children, (child) =>
            React.isValidElement<SelectItemProps>(child)
              ? React.cloneElement(child, {
                  onSelect: (value: string) => {
                    onValueChange(value);
                    setIsOpen(false);
                  },
                })
              : child
          )}
        </div>
      )}
    </div>
  );
};

const SelectItem: React.FC<SelectItemProps> = ({
  value,
  children,
  onSelect,
}) => {
  return (
    <div
      className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
      onClick={() => onSelect?.(value)}
    >
      {children}
    </div>
  );
};

const Label: React.FC<LabelProps> = ({ htmlFor, children, className = "" }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
  >
    {children}
  </label>
);

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ${className}`}
  >
    {children}
  </button>
);

// Utility function to find service path by ID
const findServicePath = (
  services: NestedService[],
  targetId: number,
  currentPath: NestedService[] = []
): NestedService[] | null => {
  for (const service of services) {
    const newPath = [...currentPath, service];

    if (service.id === targetId) {
      return newPath;
    }

    if (service.subcategory && service.subcategory.length > 0) {
      const found = findServicePath(service.subcategory, targetId, newPath);
      if (found) {
        return found;
      }
    }
  }

  return null;
};

const EditNestedServiceForm = ({
  onServiceSelect,
  serviceId,
  services,
}: {
  services: NestedService[];
  serviceId: number | null;
  onServiceSelect: (id: number | null) => void;
}) => {
  const [selectedPath, setSelectedPath] = useState<number[]>([]);
  const [formData, setFormData] = useState<FormData>({
    selectedServices: [],
    finalSelection: null,
  });

  // Find available options for current level
  const getCurrentOptions = (level: number): NestedService[] => {
    if (level === 0) return services;

    let currentOptions: NestedService[] = services;
    for (let i = 0; i < level; i++) {
      const selectedId = selectedPath[i];
      const selected = currentOptions.find(
        (service) => service.id === selectedId
      );
      if (selected && selected.subcategory) {
        currentOptions = selected.subcategory;
      } else {
        return [];
      }
    }
    return currentOptions;
  };

  // Handle selection at any level
  const handleSelection = (level: number, serviceId: number): void => {
    const newPath = selectedPath.slice(0, level);
    newPath[level] = serviceId;

    // Find the selected service to get its name
    const currentOptions = getCurrentOptions(level);
    const selectedService = currentOptions.find(
      (service) => service.id === serviceId
    );

    // Update selected path
    setSelectedPath(newPath);

    // Update form data
    const newSelectedServices: SelectedService[] = [];
    let currentLevel: NestedService[] = services;

    for (let i = 0; i <= level; i++) {
      const id = newPath[i];
      const service = currentLevel.find((s) => s.id === id);
      if (service) {
        newSelectedServices.push({
          id: service.id,
          name: service.name,
          level: i,
        });
        currentLevel = service.subcategory || [];
      }
    }

    setFormData({
      selectedServices: newSelectedServices,
      finalSelection:
        selectedService && selectedService.subcategory.length === 0
          ? selectedService
          : null,
    });
    onServiceSelect(selectedService ? selectedService.id : null);
  };

  // Get selected service name for a level
  const getSelectedName = (level: number): string => {
    if (!selectedPath[level]) return "";
    const options = getCurrentOptions(level);
    const selected = options.find(
      (service) => service.id === selectedPath[level]
    );
    return selected ? selected.name : "";
  };

  // Check if next level should be shown
  const shouldShowNextLevel = (level: number): boolean => {
    if (!selectedPath[level]) return false;
    const options = getCurrentOptions(level);
    const selected = options.find(
      (service) => service.id === selectedPath[level]
    );
    return selected
      ? selected.subcategory && selected.subcategory.length > 0
      : false;
  };

  const resetForm = (): void => {
    onServiceSelect(null);
    setSelectedPath([]);
    setFormData({
      selectedServices: [],
      finalSelection: null,
    });
  };

  // Calculate how many levels to show
  const levelsToShow: number[] = [];
  for (let i = 0; i < 5; i++) {
    // Max 5 levels
    if (i === 0 || shouldShowNextLevel(i - 1)) {
      levelsToShow.push(i);
    } else {
      break;
    }
  }

  useEffect(() => {
    if (serviceId) {
      const servicePath = findServicePath(services, serviceId);
      if (servicePath) {
        initializeFormWithPath(servicePath);
        onServiceSelect(serviceId);
      }
    }
  }, [serviceId, onServiceSelect, services]);

  // Initialize form with a service path
  const initializeFormWithPath = (servicePath: NestedService[]): void => {
    const newSelectedPath: number[] = servicePath.map((service) => service.id);
    const newSelectedServices: SelectedService[] = servicePath.map(
      (service, index) => ({
        id: service.id,
        name: service.name,
        level: index,
      })
    );

    setSelectedPath(newSelectedPath);
    setFormData({
      selectedServices: newSelectedServices,
      finalSelection: servicePath[servicePath.length - 1],
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-6">
        {levelsToShow.map((level) => {
          const options = getCurrentOptions(level);
          const levelName =
            level === 0 ? "Main Service" : `Sub-service Level ${level}`;

          return (
            <div key={level} className="space-y-2">
              <Label htmlFor={`service-level-${level}`}>
                {levelName}
                {level > 0 && (
                  <span className="text-sm text-gray-500 ml-1">
                    (under {getSelectedName(level - 1)})
                  </span>
                )}
              </Label>

              <Select
                value={getSelectedName(level)}
                onValueChange={(value) =>
                  handleSelection(level, parseInt(value))
                }
                disabled={options.length === 0}
              >
                {options.map((service) => (
                  <SelectItem key={service.id} value={service.id.toString()}>
                    <div className="flex items-center justify-between w-full">
                      <span>{service.name}</span>
                      {service.subcategory &&
                        service.subcategory.length > 0 && (
                          <span className="text-xs text-gray-400 ml-2">
                            ({service.subcategory.length} sub-options)
                          </span>
                        )}
                    </div>
                  </SelectItem>
                ))}
              </Select>
            </div>
          );
        })}

        {/* Selected Path Display */}
        {formData.selectedServices.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2">Selected Path:</h3>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {formData.selectedServices.map((service, index) => (
                <React.Fragment key={service.id}>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {service.name}
                  </span>
                  {index < formData.selectedServices.length - 1 && (
                    <span className="text-gray-400">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 hover:bg-gray-600"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditNestedServiceForm;
