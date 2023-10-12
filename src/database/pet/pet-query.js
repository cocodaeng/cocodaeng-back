exports.createPet = () => {
  return `
        INSERT INTO TBL_PET
            (member_no, bread_no, pet_name, pet_profile_picture,
                pet_age, pet_weight, create_date, pet_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
};
