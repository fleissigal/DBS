using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WestWallScript : MonoBehaviour {

	private Renderer rn;
	private float elapsedTime;


	// Use this for initialization
	void Start () {
		rn = GetComponent<Renderer> ();
	}
	
	// Update is called once per frame
	// Changes the color of the 'player' from green to red and back every X seconds
	void Update() {
	    elapsedTime += Time.deltaTime;

	    if (elapsedTime >= 3) {
	        elapsedTime -= 3;
			rn = GetComponent<Renderer> ();
			if (rn.material.color == Color.red) {
				rn.material.color = Color.green;
			} else {
				rn.material.color = Color.red;
			}
		}
	}
}