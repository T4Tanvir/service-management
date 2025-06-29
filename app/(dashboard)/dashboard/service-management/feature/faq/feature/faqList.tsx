/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IFaq } from "@/type/faq.type";
import { Edit, Trash2 } from "lucide-react";

interface FaqsListProps {
  faqs: IFaq[];
  onActionIdChange: (id: number | null, action: string) => void;
}

export function FaqsList({ faqs, onActionIdChange }: FaqsListProps) {
  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <Card key={faq.id}>
          <CardHeader className="p-4 pb-0">
            <Badge variant="outline" className="w-fit mb-2">
              {faq.service?.name ?? "Home"}
            </Badge>
          </CardHeader>
          <CardContent className="">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={faq.id.toString()} className="border-none">
                <div className="flex items-start justify-between">
                  <AccordionTrigger className="text-left font-medium py-0">
                    {faq.question}
                  </AccordionTrigger>
                  <div className="flex space-x-1 mt-1 ml-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        onActionIdChange(faq.id, "edit");
                      }}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        onActionIdChange(faq.id, "delete");
                      }}
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <AccordionContent className="pt-2 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
