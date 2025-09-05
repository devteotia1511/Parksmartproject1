"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

export default function CampaignForm({ onAdd, initialData, triggerLabel = "Create Campaign" }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    budget: "",
    status: "Active",
    startDate: "",
    endDate: "",
    description: "",
    targetAudience: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = () => {
    if (!form.name || !form.budget) return;
    onAdd?.({
      id: initialData?.id ?? Date.now(),
      name: form.name,
      budget: Number(form.budget),
      status: form.status || "Active",
      startDate: form.startDate,
      endDate: form.endDate,
      description: form.description,
      targetAudience: form.targetAudience,
    });
    setOpen(false);
    setForm({
      name: "",
      budget: "",
      status: "Active",
      startDate: "",
      endDate: "",
      description: "",
      targetAudience: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-[#18cc69] hover:bg-[#22b162]'>{triggerLabel}</Button>
      </DialogTrigger>

      <DialogContent className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
        <DialogTitle className="text-lg font-semibold text-gray-900">
          {initialData ? "Edit Campaign" : "Create New Campaign"}
        </DialogTitle>
        
        <div className="space-y-2">
          <label className="text-sm font-medium mb-5">Campaign Name</label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g., Diwali Blast"
          />
        </div>

        <div className="space-y-2 mb-5">
          <label className="text-sm font-medium">Budget</label>
          <Input
            name="budget"
            type="number"
            value={form.budget}
            onChange={handleChange}
            placeholder="e.g., 5000"
          />
        </div>

        <div className="space-y-2 mb-5">
          <label className="text-sm font-medium">Start Date</label>
          <Input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2 mb-5">
          <label className="text-sm font-medium">End Date</label>
          <Input
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2 mb-5">
          <label className="text-sm font-medium">Description</label>
          <Input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short description of campaign"
          />
        </div>

        <div className="space-y-2 mb-5">
          <label className="text-sm font-medium">Target Audience</label>
          <Input
            name="targetAudience"
            value={form.targetAudience}
            onChange={handleChange}
            placeholder="e.g., Youth, Families"
          />
        </div>

        <div className="space-y-2 mb-5">
          <label className="text-sm font-medium">Status</label>
          <select
            name="status"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            value={form.status}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Paused</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>{initialData ? "Save Changes" : "Save"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}