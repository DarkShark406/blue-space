import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {
  connect(
    "mongodb+srv://bluespaceuel:sEuAK11kjlfHcwpe@bluespace.csoih8g.mongodb.net/bluespace",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  ).then(
    () => console.log("connect successfully"),
    (error) => console.log(error)
  );
};
