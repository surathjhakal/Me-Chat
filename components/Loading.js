import { Circle } from "better-react-spinkit";

export default function Loading() {
  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          height={150}
          style={{ marginBottom: 50 }}
          src="https://images.vexels.com/media/users/3/139911/isolated/preview/1afb4038427b2bd8edd275940aea269d-chat-service-icon.png"
        />
        <Circle color="#ef8833" size={60} />
      </div>
    </div>
  );
}
