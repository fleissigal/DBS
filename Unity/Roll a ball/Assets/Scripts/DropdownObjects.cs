using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class DropdownObjects : MonoBehaviour {

	private Renderer rn;
	private GameObject northObject;
	private GameObject southObject;

	void Start() {

		rn = GetComponent<Renderer> ();
		northObject = GameObject.Find("NorthWall");
		southObject = GameObject.Find("SouthWall");
	}

	// Changes the color of the 'player' from green to red and back according to the dropdown menu
	public void Dropdown_Objects(int index) {
		if (index == 0) rn = northObject.GetComponent<Renderer> ();
		if (index == 1) rn = southObject.GetComponent<Renderer> ();

		if (rn.material.color == Color.red) {
			rn.material.color = Color.green;
		} else {
			rn.material.color = Color.red;
		}
	}
}
