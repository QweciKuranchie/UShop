import Container from "@/components/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const BrandsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ushop_light_bg via-white to-ushop-pink/5">
      <Container className="py-10">
        <div className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Brands</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-ushop-purple-dark mb-4">
            Shop by Brands
          </h1>
          <p className="text-lg text-dark-text">
            Coming soon - Browse products by your favorite brands
          </p>
        </div>
      </Container>
    </div>
  );
};

export default BrandsPage;
