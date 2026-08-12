import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { departments, site } from "@/data/site";
import { api } from "@/lib/api";

type FormValues = {
  name: string;
  mobile: string;
  email: string;
  department: string;
  date: string;
  message: string;
};

const fieldClass = "mt-1.5";

export function AppointmentForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { name: "", mobile: "", email: "", department: "", date: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await api.createAppointment({
        name: values.name,
        phone: values.mobile,
        email: values.email || undefined,
        preferredDate: values.date,
        serviceKey: values.department || undefined,
        message: values.message || undefined,
      });
    } catch {
      toast.error("We could not send your request", {
        description: `Please try again, or call the hospital desk on ${site.phone}.`,
      });
      return;
    }

    toast.success("Appointment request sent", {
      description: "The hospital desk has received your request and will call you to confirm the slot.",
    });
    reset();
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-surface space-y-5 p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Patient name *</Label>
          <Input
            id="name"
            className={fieldClass}
            placeholder="Full name"
            aria-invalid={!!errors.name}
            {...register("name", {
              required: "Please enter the patient name",
              maxLength: { value: 100, message: "Name is too long" },
            })}
          />
          {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="mobile">Mobile number *</Label>
          <Input
            id="mobile"
            inputMode="tel"
            className={fieldClass}
            placeholder="10-digit mobile number"
            aria-invalid={!!errors.mobile}
            {...register("mobile", {
              required: "Please enter a mobile number",
              pattern: { value: /^[0-9+\s-]{8,15}$/, message: "Enter a valid mobile number" },
            })}
          />
          {errors.mobile && <p className="mt-1.5 text-xs text-destructive">{errors.mobile.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className={fieldClass}
            placeholder="you@example.com"
            {...register("email", {
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
              maxLength: { value: 255, message: "Email is too long" },
            })}
          />
          {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <select
            id="department"
            className="mt-1.5 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            {...register("department")}
          >
            <option value="">Select department</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="date">Preferred date</Label>
          <Input id="date" type="date" className={fieldClass} {...register("date")} />
        </div>
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={4}
          className={fieldClass}
          placeholder="Briefly describe the complaint (optional)"
          {...register("message", { maxLength: { value: 1000, message: "Message is too long" } })}
        />
        {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message.message}</p>}
      </div>
      <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        Book Appointment
      </Button>
      <p className="text-xs text-muted-foreground">
        Your request goes directly to the hospital appointment desk and a team member will call you back. For
        emergencies, please call{" "}
        <a href={site.emergencyHref} className="font-medium text-teal hover:underline">
          {site.emergencyPhone}
        </a>
        .
      </p>

    </form>
  );
}
