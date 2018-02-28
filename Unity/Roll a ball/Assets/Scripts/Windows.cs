using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Windows : MonoBehaviour {

	private Renderer rn;
	private GameObject frontObject;
	private GameObject sideObject;

	void Start() {

		rn = GetComponent<Renderer> ();
		frontObject = GameObject.Find("frontWindow");
		sideObject = GameObject.Find("sideWindow");
	}

	// Changes the color of the 'player' from green to red and back according to the dropdown menu
	public void Dropdown_Objects(int index) {
		if (index == 0) rn = frontObject.GetComponent<Renderer> ();
		if (index == 1) rn = sideObject.GetComponent<Renderer> ();

		if (rn.material.color == Color.red) {
			rn.material.color = Color.green;
		} else {
			rn.material.color = Color.red;
		}
	}
}
