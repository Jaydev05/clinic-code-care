import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiStar } from "react-icons/fi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

type FormValues = { name: string; message: string };

const fieldClass = "mt-1.5";

export function FeedbackForm() {
  const [rating, setRating] = useState(5);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: { name: "", message: "" } });

  const onSubmit = async (values: FormValues) => {
    try {
      await api.createFeedback({ name: values.name, rating, message: values.message });
    } catch {
      toast.error("We could not send your feedback", { description: "Please try again in a moment." });
      return;
    }
    toast.success("Thank you for your feedback", {
      description: "It will appear on the site once the hospital team reviews it.",
    });
    reset();
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-surface space-y-5 p-6 sm:p-8" noValidate>
      <div>
        <Label htmlFor="fb-name">Your name *</Label>
        <Input
          id="fb-name"
          className={fieldClass}
          placeholder="Full name"
          aria-invalid={!!errors.name}
          {...register("name", {
            required: "Please enter your name",
            minLength: { value: 2, message: "Name is too short" },
            maxLength: { value: 100, message: "Name is too long" },
          })}
        />
        {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div>
        <span className="text-sm font-medium">Your rating</span>
        <div className="mt-1.5 flex gap-1.5" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value} star${value > 1 ? "s" : ""}`}
              onClick={() => setRating(value)}
              className="text-teal transition-transform hover:scale-110"
            >
              <FiStar className={`size-6 ${value <= rating ? "fill-current" : "opacity-40"}`} />
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="fb-message">Your experience *</Label>
        <Textarea
          id="fb-message"
          rows={4}
          className={fieldClass}
          placeholder="Tell us about your treatment and care"
          aria-invalid={!!errors.message}
          {...register("message", {
            required: "Please share a few words",
            minLength: { value: 3, message: "Please write a little more" },
            maxLength: { value: 2000, message: "Message is too long" },
          })}
        />
        {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        Submit Feedback
      </Button>
      <p className="text-xs text-muted-foreground">
        Feedback is published only after the hospital team reviews and approves it.
      </p>
    </form>
  );
}
