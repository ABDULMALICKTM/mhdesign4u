import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "../../lib/servicesData";
import ServiceDetail from "./ServiceDetail";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.name,
    description: service.summary,
  };
}

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== service.slug);

  return <ServiceDetail service={service} otherServices={otherServices} />;
}
