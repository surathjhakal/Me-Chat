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
          height={200}
          style={{ marginBottom: 50 }}
          src="https://us.123rf.com/450wm/alsstocks450/alsstocks4502002/alsstocks450200200089/139320546-voronezh-russia-january-31-2020-whatsapp-logo-green-round-icon-with-shadow.jpg?ver=6"
        />
        <Circle color="#3CBC28" size={60} />
      </div>
    </div>
  );
}
