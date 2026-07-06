import React from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";

const Home = () => {
  return (
    <Container className="bg-shop_light_pink">
      <h2 className="text-xl font-semibold">Home</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda sed
        blanditiis, omnis accusantium rem dolores voluptatibus alias itaque.
        Error consequuntur sapiente consectetur delectus optio quaerat
        distinctio ipsam impedit cupiditate pariatur laudantium, libero, eum
        natus atque laboriosam? Qui quisquam accusantium libero totam. Optio
        temporibus cum eligendi voluptates! Doloremque maxime adipisci culpa!
      </p>
      <Button>Click me</Button>
    </Container>
  );
};

export default Home;
