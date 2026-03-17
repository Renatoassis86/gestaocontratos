import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx'
import * as fs from 'fs'
import * as path from 'path'

export class DocumentoGenerator {
  /**
   * Converte o preenchimento de HTML para um buffer PDF simples
   */
  async gerarPDF(titulo: string, corpoHtml: string): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([600, 800])
    const { width, height } = page.getSize()

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    // 1. Adicionar Branding (Logo) se existir
    try {
      const logoPath = path.join(process.cwd(), 'public', 'images', 'logo_documento.png')
      if (fs.existsSync(logoPath)) {
        const logoBytes = fs.readFileSync(logoPath)
        const logoImage = await pdfDoc.embedPng(logoBytes)
        page.drawImage(logoImage, {
          x: 250,
          y: height - 100,
          width: 100,
          height: 60,
        })
      }
    } catch (e) { /* ignore se falhar logo */ }

    // 2. Adicionar Título
    page.drawText(titulo.toUpperCase(), {
      x: 50,
      y: height - 130,
      size: 16,
      font: fontBold,
      color: rgb(0.1, 0.1, 0.3),
    })

    // 3. Adicionar Texto (Simplificado remove HTML tags para o PDFKit básico)
    const textoLimpo = corpoHtml.replace(/<[^>]*>/g, '\n').replace(/\n\s*\n/g, '\n');
    const linhas = textoLimpo.split('\n');

    let currentY = height - 160;
    for (const linha of linhas) {
      if (linha.trim() === '') continue;
      
      if (currentY < 50) { // Nova Página
        const newPage = pdfDoc.addPage([600, 800])
        currentY = 750;
      }

      page.drawText(linha.trim(), {
        x: 50,
        y: currentY,
        size: 11,
        font: font,
      })
      currentY -= 15;
    }

    const pdfBytes = await pdfDoc.save()
    return Buffer.from(pdfBytes)
  }

  /**
   * Converte Certificado (Página 1 com Background) + Histórico (Página 2+)
   */
  async gerarCertificadoComHistorico(tituloCertificado: string, corpoCertificado: string, corpoHistorico: string): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create()
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    
    // ==========================================
    // PÁGINA 1: CERTIFICADO (BACKGROUND)
    // ==========================================
    const page1 = pdfDoc.addPage([1000, 700]) // Landscape aproximado (A4 horizontal)
    const { width: w1, height: h1 } = page1.getSize()

    try {
      const bgPath = path.join(process.cwd(), 'public', 'images', 'certificado_background.jpg')
      if (fs.existsSync(bgPath)) {
        const bgBytes = fs.readFileSync(bgPath)
        const bgImage = await pdfDoc.embedJpg(bgBytes)
        page1.drawImage(bgImage, { x: 0, y: 0, width: w1, height: h1 })
      }
    } catch (e) { /* fallback invisivel */ }

    // Adicionar Texto por cima do Certificado
    const textoCertificadoLimpo = corpoCertificado.replace(/<[^>]*>/g, ' ');
    // Desenhar num Box centralizado aproximado (Y: 350 para o meio)
    page1.drawText(textoCertificadoLimpo, {
      x: 150,
      y: 350,
      size: 14,
      font: font,
      maxWidth: 700,
      lineHeight: 18,
    })

    // ==========================================
    // PÁGINA 2: HISTÓRICO
    // ==========================================
    const page2 = pdfDoc.addPage([600, 800])
    const { height: h2 } = page2.getSize()

    const textoHistoricoLimpo = corpoHistorico.replace(/<[^>]*>/g, '\n').replace(/\n\s*\n/g, '\n');
    const linhas = textoHistoricoLimpo.split('\n');

    page2.drawText(tituloCertificado.toUpperCase() + ' - HISTÓRICO', { x: 50, y: h2 - 50, size: 14, font })
    
    let currentY = h2 - 80;
    for (const linha of linhas) {
      page2.drawText(linha.trim(), { x: 50, y: currentY, size: 11, font })
      currentY -= 15;
    }

    const pdfBytes = await pdfDoc.save()
    return Buffer.from(pdfBytes)
  }

  /**
   * Converte corpo simplificado em DOCX Word estático

   */
  async gerarDocx(titulo: string, corpoHtml: string): Promise<Buffer> {
    const textoLimpo = corpoHtml.replace(/<[^>]*>/g, '\n').replace(/\n\s*\n/g, '\n');
    const linhas = textoLimpo.split('\n');

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: titulo,
            heading: HeadingLevel.HEADING_1,
          }),
          ...linhas.map(l => new Paragraph({
            children: [new TextRun(l.trim())],
          }))
        ]
      }]
    });

    const docxBuffer = await Packer.toBuffer(doc);
    return Buffer.from(docxBuffer)
  }
}
  
