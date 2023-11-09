class PetAllergyDTO {
  petNo;
  allergyIngredientNoList;

  constructor(petNo, allergyIngredientNoList) {
    this.petNo = petNo;
    this.allergyIngredientNoList = allergyIngredientNoList;
  }
}

module.exports = PetAllergyDTO;
