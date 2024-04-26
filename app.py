from flask import Flask, request, render_template
# from dotenv import load_dotenv
import os
import secrets
import xml.etree.ElementTree as ET
import datetime
import logging
import datetime

app = Flask(__name__)

# Stel het pad naar de templates map in
template_dir = os.path.abspath('templates')
app.template_folder = template_dir
datum_tijd = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# Maak een nieuwe XML-hoofdelement bij het starten van de applicatie
root_info = ET.Element('info')
root_vragen = ET.Element('antwoorden')

@app.route('/')
def index():
    user_id = secrets.token_urlsafe(16)
    return render_template('index.html', user_id=user_id)

@app.route('/informatie')
def informatie():
    user_id = request.args.get('user_id')
    return render_template('informatie.html', user_id=user_id)

@app.route('/vragen')
def vragen():
    user_id = request.args.get('user_id')
    return render_template('vragen.html', user_id=user_id)

@app.route('/bedankt')
def bedankt():
    return render_template('bedankt.html')

@app.route('/opslaan', methods=['POST'])
def opslaan():
    user_id = request.form['user_id']
    leeftijd = request.form['leeftijd']
    geslacht = request.form['geslacht']

    # Maak een nieuw <antwoord> element
    antwoord = ET.SubElement(root_info, 'antwoord')
    ET.SubElement(antwoord, 'user_id').text = user_id
    ET.SubElement(antwoord, 'leeftijd').text = leeftijd
    ET.SubElement(antwoord, 'geslacht').text = geslacht

    # Schrijf de XML-structuur naar het info.xml bestand
    tree = ET.ElementTree(root_info)
    with open('info.xml', 'wb') as f:
        tree.write(f, encoding='utf-8', xml_declaration=True)

    return {'success': True, 'user_id': user_id}

@app.route('/opslaan_vragen', methods=['POST'])
def opslaan_vragen():
    try:
        data = request.get_json()
        user_id = data['user_id']
        achtergrond_kleur = data['achtergrond_kleur']
        gemiddelde_tijd = str(data['gemiddelde_tijd'])
        aantal_fouten = str(data['aantal_fouten'])
        reactiesnelheid_spel = str(data.get('reactiesnelheid_spel', '0'))

        # Zoek het user_id element of maak een nieuwe
        user_element = root_vragen.find(f"./user[@id='{user_id}']")
        if user_element is None:
            user_element = ET.SubElement(root_vragen, 'user', attrib={'id': user_id})

        # Maak een nieuw set element
        set_element = ET.SubElement(user_element, 'set')
        ET.SubElement(set_element, 'achtergrond_kleur').text = achtergrond_kleur
        ET.SubElement(set_element, 'gemiddelde_tijd').text = gemiddelde_tijd
        ET.SubElement(set_element, 'aantal_fouten').text = aantal_fouten
        ET.SubElement(set_element, 'reactiesnelheid_spel').text = reactiesnelheid_spel

        # Schrijf de XML-structuur naar het antwoorden.xml bestand
        tree = ET.ElementTree(root_vragen)
        with open('antwoorden.xml', 'wb') as f:
            tree.write(f, encoding='utf-8', xml_declaration=True)

        return {'success': True}
    except Exception as e:
        logging.error(f"Fout bij opslaan van vragen: {str(e)}")
        return {'success': False, 'error': str(e)}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv('SERVER_PORT'))