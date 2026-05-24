import { useSelector } from "react-redux";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


export default function Home() {

    const form = useSelector((state) => state.form);
    const documentRef = useRef();

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = async () => {
        const element = documentRef.current;

        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: [244, 336] // A4 (صفحة صغيرة)
        });

        pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
        pdf.save("document.pdf");
    };




    return (
        <>
            <style>
                {`
                body {
                    background: #eee;
                }
                    @media print {
    .no-print {
        display: none !important;
    }
}

                .document {
                    width: 75%;
                    margin: 0px auto;
                    background: white;
                    padding: 0px 40px;
                    border: 1px solid #ccc;
                    font-family: Arial;
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px solid #000;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                    margin:0 auto;
                    width:100%;

                }

                .title {
                    text-align: center;
                    font-size: 24px;
                    margin: 20px 0;
                    transform:translate(19px,1px);
                    font-weight: bold;
                    width:80%;
                    margin-left:50px

                }

                .info {
                      transform:translate(20px,12px);

                    width:100%;
                }

                .info p {

                   margin:5px 0;
                }
                   .h3{
                   transform:translate(0,20px)
                   }
                    .info h3{
                     transform:translate(-30px,10px)
                    }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    margin-left:10px;
                }

                table, th, td {
                    border: 1px solid black;
                }

                th, td {
                    padding: 10px;
                    text-align: center;
                }

                .footer {
                    margin-top: 50px;
                    display: flex;
                    justify-content: space-around;
                    gap: 20px;
                    width: 100%;
                }

                .signature {
                    margin-top: 40px;
                    text-align: center;
                }

                button {
                    margin: 20px;
                    padding: 10px 20px;
                    cursor: pointer;
                }

                /* PRINT */
                @media print {
                    button {
                        display: none;
                    }

                    body {
                        background: white;
                    }

                    .document {
                        border: none;
                        width: 100%;
                        margin: 0;
                    }
                }
                `}
            </style>

            <div ref={documentRef} className="document">

                {/* HEADER */}
                <div className="header">
                    <div >
                        <h2>My Company</h2>
                        <p>Casablanca, Maroc</p>
                    </div>
                    <div style={{textAlign: "right",marginLeft:"20px"}}>
                        <p>Date: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* TITLE */}
                <div className="title" >
                    BON DE SERVICE / PRODUIT
                </div>

                {/* CLIENT INFO */}
                <div className="info">
                    <p><strong>Client:</strong> {form.client_name}</p>
                    <p><strong>Email:</strong> {form.client_email}</p>
                    <p><strong>Status:</strong> {form.client_status}</p>
                </div>

                {/* TABLE PRODUIT */}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Produit</th>
                            <th>Prix</th>
                            <th>Description</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{form.id_produit}</td>
                            <td>{form.name}</td>
                            <td>{form.prix} DH</td>
                            <td>{form.client_description}</td>
                            <td><img src={form.img} alt="Produit" style={{width: "100px", height: "100px"}} /></td>
                        </tr>
                    </tbody>
                </table>

                {/* TECHNICIEN */}
                <div className="info">
                    <h3>Technicien</h3>
                    <p className="h3">ID: {form.technicien_id}</p>
                    <p className="h3">Nom: {form.technicien_name}</p>
                    <p className="h3">Spécialité: {form.technicien_specialite}</p>
                    <p className="h3">Téléphone: {form.technicien_tel}</p>
                </div>

                {/* FOOTER */}
                <div className="footer">
                    <div className="signature">
                        <p style={{textAlign:"center"}}>Signature Client</p>
                        <br />
                        <p style={{textAlign:"center"}}>_____________</p>
                    </div>
                    <div className="signature">
                        <p style={{textAlign:"center"}}>Signature Société</p>
                        <br />
                        <p style={{textAlign:"center"}}>_____________</p>
                    </div>
                </div>

                 <div style={{ textAlign: "center" }} className="no-print">
                <button className="no-print" onClick={() => handlePrint()}>🖨️ Imprimer</button>
                <button className="no-print" onClick={() => handleDownloadPDF()}>📄 Télécharger PDF</button>
            </div>
            </div>
        </>
    );
}
