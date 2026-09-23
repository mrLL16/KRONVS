import { homeContent } from "@/content";
import { MethodCarousel } from "@/components/sections/method-carousel";


export function HomeMethod() {
  return <MethodCarousel steps={homeContent.method.steps} ariaLabel="Etapas do método KRONVS" />;
}
