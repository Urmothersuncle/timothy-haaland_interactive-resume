import qrcode

url = 'https://urmothersuncle.github.io/timothy-haaland_interactive-resume/'

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)

qr.add_data(url)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")

img.save('interactive_resume_qr.png')