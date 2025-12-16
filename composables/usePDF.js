import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const usePDF = () => {
  const generatePDF = async (schools, educationLevel) => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    const levelMap = {
      'sd': 'SD',
      'smp': 'SMP', 
      'sma': 'SMA',
      'smk': 'SMK',
      'universitas': 'Universitas'
    }
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const today = new Date().toLocaleDateString('id-ID', options)
    
    const logoImg = new Image()
    logoImg.src = '/images/logo.jpg'
    
    await new Promise((resolve) => {
      logoImg.onload = () => {
        pdf.addImage(logoImg, 'JPEG', 15, 15, 40, 9)
        resolve()
      }
      logoImg.onerror = () => {
        console.error('Logo tidak ditemukan')
        resolve()
      }
    })
    
    pdf.setTextColor(44, 62, 80)
    pdf.setFontSize(24)
    pdf.setFont(undefined, 'bold')
    pdf.text('LAPORAN PERINGKAT SEKOLAH', 60, 20)
    
    pdf.setFontSize(12)
    pdf.setFont(undefined, 'normal')
    pdf.setTextColor(127, 140, 141)
    pdf.text('Sistem Pemeringkatan Sekolah Berbasis Rating', 60, 28)
    
    pdf.setDrawColor(44, 62, 80)
    pdf.setLineWidth(0.5)
    pdf.line(15, 35, 195, 35)
    
    pdf.setDrawColor(52, 152, 219)
    pdf.setLineWidth(2)
    pdf.line(15, 45, 15, 80)
    
    pdf.setTextColor(44, 62, 80)
    pdf.setFontSize(11)
    pdf.setFont(undefined, 'bold')
    
    pdf.text('Jenjang:', 25, 55)
    pdf.setFont(undefined, 'normal')
    pdf.text(levelMap[educationLevel] || educationLevel.toUpperCase(), 80, 55)
    
    pdf.setFont(undefined, 'bold')
    pdf.text('Hari/Tanggal:', 25, 65)
    pdf.setFont(undefined, 'normal')
    pdf.text(today, 80, 65)
    
    pdf.setFont(undefined, 'bold')
    pdf.text('Total Data:', 25, 75)
    pdf.setFont(undefined, 'normal')
    pdf.text(`${schools.length} Sekolah Terbaik`, 80, 75)
    
    const tableData = schools.map((school, index) => [
      index + 1,
      school.name,
      school.rating,
      school.reviewers.toLocaleString()
    ])
    
    autoTable(pdf, {
      startY: 90,
      head: [['Peringkat', 'Nama Sekolah', 'Total Rating', 'Jumlah Review']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [52, 73, 94],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 11,
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 10,
        textColor: [44, 62, 80]
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 25 },
        1: { halign: 'left', cellWidth: 95 },
        2: { halign: 'center', cellWidth: 30 },
        3: { halign: 'center', cellWidth: 35 }
      },
      margin: { left: 15, right: 15 }
    })
    
    pdf.save(`laporan-sekolah-${educationLevel}-${new Date().getTime()}.pdf`)
  }

  return { generatePDF }
}