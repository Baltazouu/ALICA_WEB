'use client';
import styles from "../../../(style)/offers.module.css";

export default function AddOffer() {

  async function postData() {
    event?.preventDefault();
    const formData = new FormData(event!.target as HTMLFormElement); 

    const requestData = {
        alumniId: "3a948907eabc471ea6d1f3cd29fce3f0", 
        title: formData.get('title'),
        description: formData.get('description'),
        contract: formData.get('econtrat') === '0' ? 'CDI' : formData.get('econtrat') === '1' ? 'CDD' : formData.get('econtrat') === '2' ? 'Stage' : 'Alternance',
        level: formData.get('elevel') === '0' ? 'JUNIOR' : formData.get('elevel') === '1' ? 'SENIOR' : 'INDIFFERENT',
        city: formData.get('city'),
        company: formData.get('company'),
        jobDescription: formData.get('job_description'),
        studies: formData.get('estudies') === '0' ? 'BAC_2' : formData.get('estudies') === '1' ? 'BAC_3' : formData.get('estudies') === '2' ? 'BAC_5' : 'INDIFFERENT',
        contactEmail: formData.get('contact_email'),
        image: "", 
        experienceRequired: formData.get('experience_required'),
        contactNumber: formData.get('contact_number'),
        companyURL: formData.get('companyurl')
    };

    try {
        const res = await fetch('/api/offer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        if (res.status === 200) {
            console.log('Offer posted successfully');
            //redireger vers la page de l'offre
        }else{
            console.error('Failed to post an offer:', res.statusText);
        }
    } catch (error) {
        console.error('An error occurred', error);
    }
  }
  
  return (
    <div className={styles.addOffer}>
        <form onSubmit={postData}>
            <div>
                <label htmlFor="title">Titre : </label>
                <input type="text" id="title" name="title"/>
            </div>
            <div>
                <label htmlFor="description">Description : </label>
                <textarea id="description" name="description"></textarea>
            </div>
            <div>
                <label htmlFor="econtrat">Type : </label>
                <select id="econtrat" name="econtrat">
                    <option value="0">CDI</option>
                    <option value="1">CDD</option>
                    <option value="2">Stage</option>
                    <option value="3">Alternance</option>
                </select>
            </div>
            <div>
                <label htmlFor="job_description">Description du poste : </label>
                <textarea id="job_description" name="job_description"></textarea>
            </div>
            <div>
                <label htmlFor="elevel">Niveau : </label>
                <select id="elevel" name="elevel">
                    <option value="0">Junior</option>
                    <option value="1">Senior</option>
                    <option value="2">Indifferent</option>
                </select>
            </div>
            <div>
                <label htmlFor="estudies">Niveau d'études : </label>
                <select id="estudies" name="estudies">
                    <option value="0">Bac+2</option>
                    <option value="1">Bac+3</option>
                    <option value="2">Bac+5</option>
                    <option value="3">Indifferent</option>
                </select>
            </div>
            <div>
                <label htmlFor="city">Ville : </label>
                <input type="text" id="city" name="city"/>
            </div>
            <div>
                <label htmlFor="experience_required">Expérience requise : </label>
                <textarea id="experience_required" name="experience_required"></textarea>
            </div>
            <div>
                <label htmlFor="company">Entreprise : </label>
                <input type="text" id="company" name="company"/>
            </div>
            <div>
                <label htmlFor="companyurl">Site de l'entreprise : </label>
                <input type="text" id="companyurl" name="companyurl"/>
            </div>
            <div>
                <label htmlFor="contact_email">Email de contact : </label>
                <input type="text" id="contact_email" name="contact_email"/>
            </div>
            <div>
                <label htmlFor="contact_number">Numéro de contact : </label>
                <input type="text" id="contact_number" name="contact_number"/>
            </div>
            <div className={styles.submit}>
                <button type="submit">Ajouter</button>
            </div>
        </form>
    </div>
  );
}
