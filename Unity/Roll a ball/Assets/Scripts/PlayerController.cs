using System.Collections;
using UnityEngine.UI;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour {

	public float speed;
	public Text countText;
	public Text winText;

	private Rigidbody rb;
	private int count;
	private Renderer rn;
	private float elapsedTime;
	
	void Start() {
		rb = GetComponent<Rigidbody> ();
		count = 0;
		SetCountText(); // count must hold some value for the ToString function to work
		winText.text = "";
	}

	void FixedUpdate() {
		float moveHorizontal = Input.GetAxis ("Horizontal");
		float moveVertical = Input.GetAxis ("Vertical");

		Vector3 movement = new Vector3 (moveHorizontal, 0.0f, moveVertical);

		rb.AddForce (movement * speed);
	}

	void OnTriggerEnter(Collider other) {
		if (other.gameObject.CompareTag("Pick Up")) {
			other.gameObject.SetActive(false);
			count++;
			SetCountText();
		}
	}

	// Both count and countText are global variables for the whole script, so we don't need to pass them as arguments
	void SetCountText() {
		countText.text = "Count: " + count.ToString();
		if (count >= 12) {
			winText.text = "You Win!";
		}
	}

	void Update() {
	    elapsedTime += Time.deltaTime;

	    if (elapsedTime >= 5) {
	        elapsedTime -= 5;
			rn = GetComponent<Renderer> ();
			if (rn.material.color == Color.red) {
				rn.material.color = Color.green;
			} else {
				rn.material.color = Color.red;
			}
		}
	}

}