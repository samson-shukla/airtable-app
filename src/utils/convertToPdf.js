import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const convertToPdf = (jsonData) => {
  const doc = new jsPDF();

  const title = "My Awesome Report";
  const marginLeft = 40;
  const headers = Object.keys(jsonData[0]);
  const data = jsonData.map((element) => Object.values(element));

  let content = {
    startY: 50,
    head: headers,
    body: data,
  };

  // console.log(data);

  doc.text(title, marginLeft, 40);
  doc.autoTable(content);
  doc.save("src/data/report.pdf");
};
