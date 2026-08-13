import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { departments, site, timeSlots } from "@/data/site";
import { api } from "@/lib/api";

type FormValues = {
  name: string;
  mobile: string;
  email: string;
  department: string;
  date: string;
  time: string;
  message: string;
};

const fieldClass = "mt-1.5";
const selectClass =
  "mt-1.5 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

/** `doctorSlug` is stored on the appointment row so the desk knows who the request is for. */
export function AppointmentForm({ doctorSlug }: { doctorSlug?: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { name: "", mobile: "", email: "", department: "", date: "", time: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await api.createAppointment({
        name: values.name,
        phone: values.mobile,
        preferredDate: values.date,
        ...(values.email ? { email: values.email } : {}),
        ...(values.department ? { serviceKey: values.department } : {}),
        ...(values.time ? { preferredTime: values.time } : {}),
        ...(doctorSlug ? { doctorKey: doctorSlug } : {}),
        ...(values.message ? { message: values.message } : {}),
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
          <select id="department" className={selectClass} {...register("department")}>
            <option value="">Select department</option>
            {departments.map((d) => (
              <option key={d.label} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="date">Preferred date *</Label>
          <Input
            id="date"
            type="date"
            className={fieldClass}
            aria-invalid={!!errors.date}
            {...register("date", { required: "Please choose a preferred date" })}
          />
          {errors.date && <p className="mt-1.5 text-xs text-destructive">{errors.date.message}</p>}
        </div>
        <div>
          <Label htmlFor="time">Preferred time</Label>
          <select id="time" className={selectClass} {...register("time")}>
            <option value="">Any time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
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
