"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ServiceDto } from "@/dtos/service.dto";
import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export function ServicesList({
  services,
  onActionIdChange,
}: {
  services?: ServiceDto[];
  onActionIdChange: (id: number | null, action: string) => void;
}) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number | null) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-8">
      {/* Table Section */}
      <Card>
        <TooltipProvider>
          <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Services Table</h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services?.map((service, index) => (
                    <>
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage
                                src={service?.image_url || "/placeholder.svg"}
                                alt={service.name}
                              />
                              <AvatarFallback>
                                {service.name
                                  .split(" ")
                                  .map((word) => word[0])
                                  .join("")
                                  .slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{service.name}</div>
                              {service.parent_id && (
                                <Badge variant="outline" className="text-xs">
                                  {service.path}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <p className="text-sm text-muted-foreground cursor-help">
                                  {truncateText(service.short_description, 50)}
                                </p>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-sm">
                                <p>{service.short_description}</p>
                              </TooltipContent>
                            </Tooltip>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs mt-1"
                              onClick={() => toggleExpand(service.id)}
                            >
                              {expandedId === service.id ? (
                                <>
                                  <ChevronUp className="w-3 h-3 mr-1" />
                                  Less
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-3 h-3 mr-1" />
                                  More
                                </>
                              )}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={service.active ? "default" : "secondary"}
                          >
                            {service.active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formatDate(String(service.created_at))}
                          </div>
                          {service.updated_at && (
                            <div className="text-xs text-muted-foreground">
                              Updated: {formatDate(String(service.updated_at))}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                onActionIdChange(service.id, "edit")
                              }
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                onActionIdChange(service.id, "delete")
                              }
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedId === service.id && (
                        <TableRow>
                          <TableCell colSpan={6} className="bg-muted/50">
                            <Collapsible open={expandedId === service.id}>
                              <CollapsibleContent>
                                <div className="p-4 space-y-3">
                                  <div>
                                    <h5 className="font-semibold text-sm mb-2">
                                      Short Description:
                                    </h5>
                                    <p className="text-sm text-muted-foreground">
                                      {service?.short_description ?? ""}
                                    </p>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-sm mb-2">
                                      Details:
                                    </h5>
                                    <p
                                      className="text-sm text-muted-foreground"
                                      style={{
                                        whiteSpace: "normal",
                                        overflowWrap: "break-word",
                                      }}
                                    >
                                      {service?.details?.long_description ?? ""}
                                    </p>
                                  </div>
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TooltipProvider>
      </Card>
    </div>
  );
}
